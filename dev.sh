#!/bin/bash

SESSION="semopilots-dev"
WRANGLER_CMD="NODE_NO_WARNINGS=1 wrangler pages dev ."
BROWSER_SYNC="browser-sync start --proxy 'localhost:8788' --files '.' \
	--host '0.0.0.0'"
BROWSER_SYNC_CMD="bash -c 'NODE_OPTIONS=--no-deprecation $BROWSER_SYNC'"


case "$1" in
	start)
		tmux new-session -d -s $SESSION
		tmux send-keys -t $SESSION "$WRANGLER_CMD" Enter
		tmux split-window -v -t $SESSION
		tmux send-keys -t $SESSION "$BROWSER_SYNC_CMD" Enter
		tmux attach-session -t $SESSION
		;;
	stop)
		tmux kill-session -t $SESSION
		;;
	*)
		echo "Usage: ./dev.sh [start|stop]"
		;;
esac
