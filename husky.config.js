/* COMMANDS
    HUSKY_SKIP_HOOKS=1 git push ... (will ignore git hooks)
*/

module.exports = {
	hooks: {
		"pre-commit": "yarn lint",
		"pre-push": "yarn test",
	},
};
