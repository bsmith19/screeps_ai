
export class Upgrader
{
    run(creep:Creep)
    {
        // if your upgrader and arn't carrying energy...go get some
        if(creep.memory['upgrading'] && creep.carry.energy == 0)
        {
            creep.memory['upgrading'] = false;
            creep.say('harvest');
        }
        // if your an upgrader and are carrying energy then use it to upgrade
        if(!creep.memory['upgrading'] && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory['upgrading'] = true;
            creep.say('upgrade');
        }

        // if the creep is an upgrader(must be carrying energy as verifyed already)
        // then go upgrade the controller
        if(creep.memory['upgrading'])
        {
            // if your too far away from it move there
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(creep.room.controller);
            }
        }
        else
        {
            // Find an energy source and go harvest from it
            var sources:Source[] = creep.room.find<Source>(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
    }
}