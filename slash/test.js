const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("test").setDescription("Says fuck you ting li"),

    run: async({client, interaction}) => {
        return await interaction.editReply("fuck you ting li")
    }
}