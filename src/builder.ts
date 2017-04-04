

export class Builder 
{
    run(creep:Creep) 
    {

        // If creep isnt carrying anything, go get building supplies
        if(creep.memory['building'] && creep.carry.energy == 0) 
        {
            creep.memory['building'] = false;
            creep.say('harvest');
        }

        // if the creep is a builder and has some supplies, go build
        if(creep.memory['building'] && creep.carry.energy == creep.carryCapacity) 
        {
            creep.memory['building'] = true;
            creep.say('build');
        }

        // if your a builder...
        if(creep.memory['building']) 
        {
            // find construction sites to go help on
            var targets:ConstructionSite[] = creep.room.find<ConstructionSite>(FIND_CONSTRUCTION_SITES);

            // if construction sites exist...
            if(targets.length > 0) 
            {
                //move to them
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0])
                }
            }
            else 
            {
                // no construction sites, so go to a source to  harvest
                // find the sources first
                var sources = creep.room.find<Source>(FIND_SOURCES);
                // move there if not in range
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
}