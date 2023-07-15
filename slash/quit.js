const { SlashCommandBuilder } = require("@discordjs/builders");
const { useMainPlayer } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Stops the bot and clears the queue"),
    
        run: async ({ interaction }) => {
            const player = useMainPlayer();
            const queue = player.nodes.get(interaction.guildId)

            if (!queue)
                return await interaction.editReply("There are no songs in the queue")
            
            queue.delete();
            await interaction.editReply("Bye!")
        } 

}