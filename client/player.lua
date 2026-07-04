CreateThread(function()
    while true do
        Wait(500)
        local ped = PlayerPedId()
        local player = PlayerId()
        HUD:SetPlayer('health', (GetEntityHealth(ped) - 100) / 100 * 100)
        HUD:SetPlayer('armor', GetPedArmour(ped))

        local stamina = 0

        if IsPedSwimmingUnderWater(ped) then
            stamina = (GetPlayerUnderwaterTimeRemaining(player) / 10) * 100
        else
            stamina = 100 - GetPlayerSprintStaminaRemaining(player)
        end

        HUD:SetPlayer('stamina', math.floor(stamina))
    end
end)
