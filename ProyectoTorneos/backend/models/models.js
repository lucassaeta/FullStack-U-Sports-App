const { DataTypes } = require("sequelize");
const conection = require("../connection")

sequelize = conection


const ChatMessage = sequelize.define('chat_messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    message: DataTypes.STRING,
    timestamp: DataTypes.DATE
});

ChatMessage.sync()



const Logs = sequelize.define('Logs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'general'
    }
  });
  
  
  
Logs.sync()

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    sport: DataTypes.STRING,
    schedule: DataTypes.STRING,
    role: DataTypes.TINYINT,
    password: DataTypes.STRING,
    profilePic: DataTypes.STRING
});

User.sync()

const Activity = sequelize.define('activities', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    sport: DataTypes.STRING,
    date: DataTypes.DATE,
    privacity: DataTypes.BOOLEAN,
    max_plazas: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    result: DataTypes.STRING,
    place: DataTypes.STRING
});

Activity.sync()

const Tournament = sequelize.define('tournaments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    sport: DataTypes.STRING,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    min_teams: DataTypes.INTEGER,
    max_teams: DataTypes.INTEGER,
    max_players_team: DataTypes.INTEGER,
    rounds: DataTypes.INTEGER,
    type: DataTypes.INTEGER, // 1: solo equipos, 2: equipos + jugadores sueltos
    privacity: DataTypes.INTEGER, // 1: torneo privado (admin elige a quien meter), 2: torneo público (cualquiera puede unirse)
});

Tournament.sync()

const Team = sequelize.define('teams', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    sport: DataTypes.STRING,
    logo: DataTypes.STRING,
    description: DataTypes.STRING,
    max_players_team: DataTypes.INTEGER,
});

Team.sync()

const ActivityPlayer = sequelize.define('activity_players', {
    permission: DataTypes.TINYINT,
});

User.belongsToMany(Activity, { through: ActivityPlayer });
Activity.belongsToMany(User, { through: ActivityPlayer });
ActivityPlayer.sync()

const TeamMember = sequelize.define('team_members', {
    captain: DataTypes.BOOLEAN
});

User.belongsToMany(Team, { through: TeamMember });
Team.belongsToMany(User, { through: TeamMember });
TeamMember.sync()

User.hasMany(ChatMessage, { foreignKey: 'userId' });
ChatMessage.belongsTo(User, { foreignKey: 'userId' });

const TournamentTeams = sequelize.define('tournament_teams', {
    position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    defeats: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    drawns: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    group: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

Team.belongsToMany(Tournament, { through: TournamentTeams });
Tournament.belongsToMany(Team, { through: TournamentTeams });
TournamentTeams.sync()

const TournamentGroupActivities = sequelize.define('tournament_groups_activities', {
    date: DataTypes.DATE,
    jornada: DataTypes.INTEGER,
})

Activity.belongsToMany(Tournament, { through: TournamentGroupActivities });
Tournament.belongsToMany(Activity, { through: TournamentGroupActivities });
TournamentGroupActivities.sync()



module.exports = { User, Team, TeamMember, Activity, ActivityPlayer, Tournament, TournamentTeams, TournamentGroupActivities,Logs,ChatMessage }