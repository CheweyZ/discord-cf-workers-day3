import {
  createSlashCommandHandler,
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
  ApplicationCommandOptionType,
  EmbedType,
} from "@glenstack/cf-workers-discord-bot";
type APIReply={
  data:string
}


// const animals=["cat","dog","duck","fox","koala","otter","owl","panda","rabbit","red-panda","snake","turtle","wolf"]

const animalCommand: ApplicationCommand = {
  name: "animal",
  description: "Sends an animal picture!",
  options:[
    {
        "name": "animal",
        "description": "The type of animal",
        "type": ApplicationCommandOptionType.STRING,
        "required": true,
        // Save cpu time
        // "choices": animals.map(a=>({name:a,value:a}))
        "choices":[
          {
              "name": "cat",
              "value": "cat"
          },
          {
              "name": "dog",
              "value": "dog"
          },
          {
              "name": "duck",
              "value": "duck"
          },
          {
              "name": "fox",
              "value": "fox"
          },
          {
              "name": "koala",
              "value": "koala"
          },
          {
              "name": "otter",
              "value": "otter"
          },
          {
              "name": "owl",
              "value": "owl"
          },
          {
              "name": "panda",
              "value": "panda"
          },
          {
              "name": "rabbit",
              "value": "rabbit"
          },
          {
              "name": "red-panda",
              "value": "red-panda"
          },
          {
              "name": "snake",
              "value": "snake"
          },
          {
              "name": "turtle",
              "value": "turtle"
          },
          {
              "name": "wolf",
              "value": "wolf"
          }
      ]
    }
]
};

const animalHandler: InteractionHandler = async (
  interaction: Interaction
): Promise<InteractionResponse> => {

  const options=interaction.data && interaction.data.options
  const optionType=options && options[0].value

  const picUrl:APIReply=await fetch(`https://api.chewey-bot.top/${optionType}?auth=${CB_API_SECRET}`).then(r=>r.json())

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    // @ts-ignore Allowed to send no content as long as we have an embed
    data: {
      embeds:[
        {
          type:EmbedType.rich,
          title:`Here's a ${optionType}`,
          image:{
            url:picUrl.data
          },
          color: 3553599
        }
      ]
    },
  };
};

const slashCommandHandler = createSlashCommandHandler({
  applicationID: "832021959898169355",
  applicationSecret: APPLICATION_SECRET, // You should store this in a secret
  publicKey: "68b0063b5becc5fe6353be2d2aa37d13a962d3a51de338d4821a5bb601f897ae",
  commands: [[animalCommand, animalHandler]],
});

addEventListener("fetch", (event) => {
  event.respondWith(slashCommandHandler(event.request));
});

