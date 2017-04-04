import * as b from './builder';
import * as h from './harvester';

export class Main
{
    // Declare Managers as class member variables
    harvesterManager:h.Harvester = new h.Harvester();
    builderManager:b.Builder = new b.Builder();

    run() 
    {
        // Print available resources to log...
        for(var name in Game.rooms)
        {
            console.log('room '+name+' has '+Game.rooms[name].energyAvailable+' energy');
        }

        // depending on creep type, pass him to the correct manager..
        for(var name in Game.creeps)
        {
            var creep = Game.creeps[name];
            if(creep.memory["role"] == 'harvester')
            {
                this.harvesterManager.run(creep);
            }
            if(creep.memory["role"] == 'builder')
            {
                this.builderManager.run(creep);
            }
        }
    }
}

// Execute the main function
var m = new Main();
m.run();