#!/bin/sh
# Reuse the user's existing SSH alias and Keychain askpass helper; never read passwords.
set -eu
export SSH_LOGIN_HOST=alivps
export SSH_LOGIN_USER=root
export SSH_ASKPASS="$HOME/.ssh/askpass-keychain"
export SSH_ASKPASS_REQUIRE=force
exec /usr/bin/ssh -T -o StrictHostKeyChecking=yes -o ConnectTimeout=15 \
  -o ServerAliveInterval=15 -o ServerAliveCountMax=3 \
  -o PubkeyAuthentication=no -o PreferredAuthentications=password,keyboard-interactive \
  alivps "$@"
