import * as b from './builder';
import * as h from './harvester';
import * as u from './upgrader';

export class Main
{
    // Declare Managers as class member variables
    harvesterManager:h.Harvester = new h.Harvester();
    builderManager:b.Builder = new b.Builder();
    upgraderManager:u.Upgrader = new u.Upgrader();

    run() 
    {
        // Print available resources to log...
        for(var name in Game.rooms)
        {
            console.log('room '+name+' has '+Game.rooms[name].energyAvailable+' energy');
        }

        // we want at least 2 harvesters, to check and make it so
        var harvCreeps = _.filter(Game.creeps, (creep) => creep.memory['role'] == 'harvester');
        if (harvCreeps.length < 2)
        {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        }

        // check that any buildings we have are not damaged
        var tower:Tower = Game.getObjectById<Tower>('TOWER_ID');
        if(tower != null)
        {
            var closestDamageStructure:Structure = tower.pos.findClosestByRange<Structure>(FIND_STRUCTURES, 
            {
                filter: (structure) => structure.hits < structure.hitsMax
            });

            if(closestDamageStructure != null)
            {
                tower.repair(closestDamageStructure);
            }
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
            if(creep.memory["role"] == 'upgrader')
            {
                this.upgraderManager.run(creep);
            }
        }
    }
}

// Execute the main function
var m = new Main();
m.run();