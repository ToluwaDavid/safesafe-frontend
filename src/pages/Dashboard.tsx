// src/pages/Dashboard.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Navbar } from "../componnents/Navbar";
import { useAuth } from "../hooks/useAuth";
import API from "../services/api";

/**
 * Dashboard (merged Settings + Contacts + Emergency)
 * - Contact CRUD with constraints: min 2, max 5
 * - Fetches contacts from GET /user/me
 * - Saves with PUT /user/update (sends { name, emergencyContacts })
 * - Emergency send posts to POST /alerts/send (backend must handle)
 * - Hold-to-send protected by contacts count validation
 *
 * Decorative image used from local path:
 * /mnt/data/9913681b-7e63-4d7e-b7f2-e28ab4d0bf1f.png
 */

interface Contact {
  name: string;
  phone?: string;
  email?: string;
}

interface Props {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}

const MAX_CONTACTS = 5;
const MIN_CONTACTS = 2;
const HOLD_MS = 1300;

const Dashboard: React.FC<Props> = ({ theme, setTheme }) => {
  const { user } = useAuth();

  // profile + contacts
  const [name, setName] = useState<string>(user?.name || "");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // location + status
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // emergency send state
  const [isSending, setIsSending] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // validation / UI
  const [validationError, setValidationError] = useState<string | null>(null);

  // hold-to-send refs
  const holdTimerRef = useRef<number | null>(null);
  const holdProgressRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------- load profile & contacts ---------------------- */
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await API.get("/user/me");
        if (mounted && res?.data) {
          setName(res.data.name || "");
          setContacts(res.data.emergencyContacts || []);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  /* ---------------------- geolocation (watch) ---------------------- */
  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    const id = navigator.geolocation.watchPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn("Geo error:", err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  /* ---------------------- contact helpers ---------------------- */
  const addContact = () => {
    setValidationError(null);
    if (contacts.length >= MAX_CONTACTS) {
      setValidationError(`You can add up to ${MAX_CONTACTS} contacts.`);
      return;
    }
    setContacts((c) => [...c, { name: "", phone: "", email: "" }]);
  };

  const updateContact = (idx: number, key: keyof Contact, value: string) => {
    setContacts((c) => {
      const copy = [...c];
      copy[idx] = { ...copy[idx], [key]: value };
      return copy;
    });
  };

  const removeContact = (idx: number) => {
    setValidationError(null);
    setContacts((c) => c.filter((_, i) => i !== idx));
  };

  const validateContacts = (arr: Contact[]) => {
    if (arr.length < MIN_CONTACTS) return `Please add at least ${MIN_CONTACTS} trusted contacts.`;
    if (arr.length > MAX_CONTACTS) return `You can have at most ${MAX_CONTACTS} contacts.`;
    // optional: validate fields non-empty for name + phone/email
    // for (const [i, ct] of arr.entries()) {
    //   if (!ct.name?.trim()) return `Contact ${i + 1}: name is required.`;
    //   if (!ct.phone?.trim() && !ct.email?.trim()) return `Contact ${i + 1}: phone or email required.`;
    // }
    return null;
  };

  /* ---------------------- save profile & contacts ---------------------- */
  const handleSave = async () => {
    setValidationError(null);
    const v = validateContacts(contacts);
    if (v) {
      setValidationError(v);
      return;
    }
    setSaving(true);
    try {
      const res = await API.put("/user/update", { name, emergencyContacts: contacts });
      // update from server if returned
      if (res?.data?.emergencyContacts) setContacts(res.data.emergencyContacts);
      setAlertMessage("Profile saved");
      setTimeout(() => setAlertMessage(null), 2500);
    } catch (err) {
      console.error("Save failed:", err);
      setAlertMessage("Failed to save profile");
      setTimeout(() => setAlertMessage(null), 2500);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------------- emergency send (with validation) ---------------------- */
  const sendEmergency = useCallback(async (coords?: { lat: number; lng: number }) => {
    // validate contact count before attempting
    if (contacts.length < MIN_CONTACTS) {
      setValidationError(`Add at least ${MIN_CONTACTS} contacts before sending an emergency.`);
      return;
    }
    if (contacts.length > MAX_CONTACTS) {
      setValidationError(`Remove contacts so you have at most ${MAX_CONTACTS}.`);
      return;
    }
    setValidationError(null);
    setIsSending(true);
    setAlertMessage("Sending emergency...");
    try {
      const body: any = { message: `Emergency from ${name || user?.email}` };
      if (coords) body.coords = coords;
      const res = await API.post("/alerts/send", body);
      setAlertMessage(res?.data?.message || "Alert sent");
    } catch (err: any) {
      console.error("Emergency send failed:", err);
      setAlertMessage(err?.response?.data?.message || "Failed to send alert");
    } finally {
      setTimeout(() => { setAlertMessage(null); setIsSending(false); }, 3000);
    }
  }, [contacts, name, user]);

  /* ---------------------- hold-to-send handlers ---------------------- */
  const onHoldStart = () => {
    if (isSending) return;
    if (holdProgressRef.current) {
      holdProgressRef.current.style.transition = `width ${HOLD_MS}ms linear`;
      holdProgressRef.current.style.width = "100%";
    }
    holdTimerRef.current = window.setTimeout(async () => {
      // send emergency with current coords if available
      await sendEmergency(location ?? undefined);
    }, HOLD_MS);
  };

  const onHoldEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (holdProgressRef.current) {
      holdProgressRef.current.style.transition = "width 200ms ease-out";
      holdProgressRef.current.style.width = "0%";
    }
  };

  /* ---------------------- small UI helpers ---------------------- */
  const contactCount = contacts.length;
  const canAddMore = contactCount < MAX_CONTACTS;

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="min-h-screen bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark transition-colors duration-300 relative">
        {/* decorative faint background image */}


        <div className="relative z-10 max-w-6xl mx-auto p-6">
          {/* header row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold"> {user?.name ? ` 👋 Welcome , ${user?.name}` : "👋 Welcome to your dashboard " }</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Send emergency alerts, manage alerts and contacts</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-700 dark:text-gray-400">
                <div>Your Contacts: <span className="font-semibold">{contactCount}</span></div>
                <div className="text-xs mt-1">Your Location: <span className="font-medium">{location ? `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}` : "off"}</span> (Your current Latitude and Logitude)</div>
              </div>
            </div>
          </div>

          {/* top area: emergency block + info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-surfaceLight dark:bg-surfaceDark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow">
              <h2 className="text-lg font-semibold mb-3">Emergency Contacts</h2>

              {/* contact list */}
              <div className="space-y-3">
                {contacts.length === 0 && <div className="text-gray-500">No contacts yet. Add trusted people who will receive your alert.</div>}

                {contacts.map((c, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center p-3 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <input value={c.name} onChange={(e) => updateContact(idx, "name", e.target.value)} placeholder="Full name" className="p-2 rounded border dark:border-gray-600" />
                    <input value={c.phone} onChange={(e) => updateContact(idx, "phone", e.target.value)} placeholder="Phone" className="p-2 rounded border dark:border-gray-600" />
                    <input value={c.email} onChange={(e) => updateContact(idx, "email", e.target.value)} placeholder="Email" className="p-2 rounded border dark:border-gray-600" />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => removeContact(idx)} className="text-red-500 text-sm">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* actions */}
              <div className="flex items-center gap-3 mt-4">
                <button onClick={addContact} disabled={!canAddMore} className={`px-4 py-2 rounded-md ${canAddMore ? 'border' : 'opacity-50 cursor-not-allowed'}`}>+ Add contact</button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-md bg-primary text-white">{saving ? 'Saving...' : 'Save changes'}</button>

                <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                  <div>Min: {MIN_CONTACTS} • Max: {MAX_CONTACTS}</div>
                </div>
              </div>

              {validationError && <div className="mt-3 text-sm text-red-600">{validationError}</div>}
              {alertMessage && <div className="mt-3 text-sm text-green-600">{alertMessage}</div>}
            </div>

            {/* emergency column */}
            <aside className="bg-gradient-to-b from-red-500 to-red-600 rounded-2xl p-6 shadow text-white flex flex-col justify-between">
              <div>
                <div className="text-sm opacity-90">Emergency</div>
                <div className="text-2xl font-bold mt-1">Hold-to-send SOS</div>
                <p className="mt-3 text-sm opacity-95">Press and hold the central button to confirm sending your current location to your contacts.</p>
              </div>

              <div className="mt-6 flex flex-col items-center">
                <div className="relative">
                  <div className="w-44 h-44 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                    <button
                      onMouseDown={onHoldStart}
                      onMouseUp={onHoldEnd}
                      onMouseLeave={onHoldEnd}
                      onTouchStart={onHoldStart}
                      onTouchEnd={onHoldEnd}
                      disabled={isSending}
                      className={`w-36 h-36 rounded-full flex flex-col items-center justify-center font-bold transition-transform ${isSending ? 'scale-95 opacity-80' : 'hover:scale-105'}`}
                      aria-label="Hold to send emergency"
                    >
                      <span className="text-4xl">🆘</span>
                      <span className="text-xs mt-2">{isSending ? 'Sending…' : 'Hold to Send'}</span>
                    </button>

                    {/* horizontal progress bar at bottom of the circular container */}
                    <div className="absolute left-6 right-6 bottom-6 h-1 bg-white rounded" style={{ opacity: 0.12 }} />
                    <div ref={holdProgressRef} className="absolute left-6 bottom-6 h-1 bg-white rounded w-0" />
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button onClick={() => sendEmergency(location ?? undefined)} disabled={isSending} className="px-3 py-2 bg-white/20 rounded-md">Send Now</button>
                  <button onClick={() => alert('Hold for ~1.3s to avoid accidental sends')} className="px-3 py-2 bg-white/10 rounded-md">How it works</button>
                </div>

                {alertMessage && <div className="mt-3 text-sm">{alertMessage}</div>}
                {contacts.length < MIN_CONTACTS && <div className="mt-2 text-xs text-yellow-200">Add at least {MIN_CONTACTS} contacts to enable alerts.</div>}
              </div>
            </aside>
          </div>

          {/* bottom area: recent alerts + profile summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-surfaceLight dark:bg-surfaceDark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow">
              <h3 className="text-lg font-semibold mb-3">Recent Alerts</h3>
              <div className="space-y-4">
                {/* This is placeholder — replace with fetched history if available */}
                <div className="text-gray-500">No recent alerts. Your sent alerts will appear here.</div>
              </div>
            </div>

            <aside className="bg-surfaceLight dark:bg-surfaceDark rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-semibold">{user?.name ? user.name[0].toUpperCase() : 'Profile'}</div>
                <div>
                  <div className="font-medium">{user?.name || user?.email}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div>Primary phone: {contacts[0]?.phone ?? '—'}</div>
                <div className="mt-2">Location: {location ? `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}` : 'Off'}</div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Theme</div>
                  {/* <ThemeToggle theme={theme} setTheme={setTheme} /> */}
                </div>

                <button onClick={() => alert('Account settings coming soon')} className="mt-4 w-full px-3 py-2 rounded-md border">Account Settings</button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
