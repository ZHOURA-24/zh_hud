Framework = nil
PlayerData = {}

if GetResourceState('es_extended') == 'started' then
    Framework = "esx"
elseif GetResourceState('qb-core') == 'started' then
    Framework = "qb-core"
end

CreateThread(function()
    if Framework == "esx" then
        local esx = exports['es_extended']:getSharedObject()

        PlayerData = esx.GetPlayerData()

        esx.SecureNetEvent('esx:playerLoaded', function()
            while IsScreenFadedOut() do
                Wait(200)
            end

            HUD:Toggle(true)
        end)

        if esx.IsPlayerLoaded() then
            HUD:Toggle(true)
        end

        AddEventHandler("esx_status:onTick", function(data)
            local keys = {
                "hunger",
                "thirst"
            }

            for i = 1, #data do
                for j = 1, #keys, 1 do
                    if keys[j] == data[i].name then
                        HUD:SetPlayer(keys[j], data[i].percent)
                    end
                end
            end
        end)
    end
end)
