const { SlashCommandBuilder } = require("@discordjs/builders");
const { useMainPlayer } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the music"),
    
        run: async ({ interaction }) => {
            const player = useMainPlayer();
            const queue = player.nodes.get(interaction.guildId)

            if (!queue)
                return await interaction.editReply("There are no songs in the queue")
            
            queue.node.resume();
            await interaction.editReply("Music has been paused! Use `/pause` to pause the music")
        } 

}