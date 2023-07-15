const { SlashCommandBuilder } = require("@discordjs/builders");
const { useMainPlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("displays the current song queue")
        .addNumberOption((option) => option.setName("page").setDescription("Page number of the queue").setMinValue(1)),

        run: async({ interaction }) => {
            const player = useMainPlayer();
            const queue = player.nodes.get(interaction.guildId)
            if (!queue || !queue.node.isPlaying()) {
                return await interaction.editReply("There are no songs in the queue")
            }

            const totalPages = Math.ceil(queue.tracks.size / 10) || 1 //10 tracks per page in the queue
            const page = (interaction.options.getNumber("page") || 1) - 1 //if user asks for page 1, it will go to 0th index in array

            if (page > totalPages)
                return await interaction.editReply(`Invalid Page. There are only a total of ${totalPages} pages of songs`)
            
            const queueString = queue.tracks.toArray().slice(page * 10, page * 10 + 10).map((song, i) => {
                return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
            }).join("\n")

            const currentSong = queue.currentTrack;

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`**Currenty Playing**\n` +
                        (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} --<@${currentSong.requestedBy.id}>` : "None") +
                        `\n\n**Queue**\n${queueString}`
                        )
                        .setFooter({
                            text: `Page ${page + 1} of ${totalPages}`
                        })
                        .setThumbnail(currentSong.thumbnail)
                ]
            })
        }
}