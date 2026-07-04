lib.onCache('vehicle', function(vehicle)
    Wait(500)

    HUD:SetVehicle('inside', vehicle)
    HUD:SetVehicle('kmh', Config.kmh)

    while cache.vehicle do
        Wait(100)
        local speed = Config.kmh and (GetEntitySpeed(vehicle) * 3.6) or (GetEntitySpeed(vehicle) * 2.236936)
        local fuel = GetVehicleFuelLevel(vehicle)

        HUD:SetVehicle('speed', math.floor(speed))
        HUD:SetVehicle('fuel', math.floor(fuel))
    end
end)
