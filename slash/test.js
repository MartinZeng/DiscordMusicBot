const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("test").setDescription("Says fuck you ting li"),

    run: async({ interaction }) => {
        return await interaction.editReply("im gonna kiss ting li");
    }
}