#! /bin/sh

pgrep -x sxhkd > /dev/null || sxhkd &

# kill if already running
killall -9 picom xfce4-power-manager ksuperkey dunst sxhkd conky eww

# dunst &
dunst &

# Fix cursor
xsetroot -cursor_name left_ptr &

# start compositor and power manager
xfce4-power-manager &

autokey-qt &
xdotool search --name "autokey-qt" windowunmap &

bash ~/.config/bspwm/bin/launchbar.sh &

/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &

picom --config ~/.config/bspwm/picom.conf &

flameshot &

xdo below -t $(xdo id -n root) $(xdo id -a polybar-main_DisplayPort-0)

xdo below -t $(xdo id -n root) $(xdo id -a "Polybar tray window")

bspc rule -a ScratchpadAlacritty state=floating follow=off sticky=on&
