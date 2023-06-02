/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const defMissions = [
  {
    MissionID: 1,
    Name: "Sağlıklı beslen!",
    Description: "Sağlıklı ol!"
  }
]
const defTasks = [
  {
    Name: "Spora git!",
    Description: "En az 1 saat kardio yap!",
    Date: new Date().toLocaleString(),
    MissionID: 1
  },
  {
    Name: "Sağlıklı beslen!",
    Description: "Beslenmene dikkat et!",
    Date: new Date().toLocaleString(),
    MissionID: 1
  }
]

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Missions').truncate()
  await knex('Missions').insert(defMissions);

  await knex('Tasks').truncate()
  await knex('Tasks').insert(defTasks);
};
