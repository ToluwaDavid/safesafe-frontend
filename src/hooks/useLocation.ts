import React from 'react'
import { useState } from 'react'

export const useLocation = () => {
    const [location, setLocation] = useState<{lat:number; lng: number} | null >(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const getLocation = () => {
        if(!navigator.geolocation){
            setError("Geolocation not supported")
        }
        setLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                setLocation({lat: position.coords.latitude, lng:position.coords.longitude})
                setLoading(false)
            },
            (err) =>{
                setError(err.message)
                setLoading(false)
            },
            {enableHighAccuracy: true, timeout: 15000}
        )
    }
  return {location, loading, error, getLocation}
}
