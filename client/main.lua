---@diagnostic disable-next-line
lib, cache = lib, cache

RegisterNUICallback('load', function(_, cb)
    cb({ name = Config.name })
end)
