const { SlashCommandBuilder } = require("@discordjs/builders")
const { useMainPlayer } = require("discord-player")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Displays info about the currently playing song"),

	run: async ({ interaction }) => {
		const player = useMainPlayer();
		const queue = player.nodes.get(interaction.guildId);

		if (!queue) return await interaction.editReply("There are no songs in the queue");

		let bar = queue.node.createProgressBar({
			queue: false,
			length: 19,
		})

        const song = queue.currentTrack;

		await interaction.editReply({
			embeds: [new EmbedBuilder()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
        ],
		})
	},
}