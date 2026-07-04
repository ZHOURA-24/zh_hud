fx_version 'cerulean'
game 'gta5'
lua54 'yes'

version '1.0.0'

client_scripts {
    '@ox_lib/init.lua',
    'config.lua',
    'client/*.lua'
}

files {
    'web/index.html',
    'web/assets/**/*',
}

ui_page 'web/index.html'
