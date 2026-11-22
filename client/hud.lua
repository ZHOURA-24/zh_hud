HUD = {
    player = {
        health = 0,
        armor = 0,
        stamina = 0,
        hunger = 0,
        thirst = 0,
    },
    vehicle = {
        inside = false,
        fuel = 0,
        speed = 0,
    },
}

function HUD:Toggle(data)
    SendNUIMessage {
        action = 'visible',
        data = data,
    }
end

function HUD:SetPlayer(key, value)
    self.player[key] = value
    SendNUIMessage {
        action = 'player',
        data = {
            key = key,
            value = value,
        },
    }
end

function HUD:SetVehicle(key, value)
    self.vehicle[key] = value
    SendNUIMessage {
        action = 'vehicle',
        data = {
            key = key,
            value = value,
        },
    }
end
