

export class Harvester
{
    run(creep:Creep)
    {
        // if creep as some extra space...
        if(creep.carry.energy < creep.carryCapacity)
        {
            //find the nearest energy source, and either go to it or harvest if near by
            var sources:Source[] = creep.room.find<Source>(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
        else
        {
            // find a structure that can take this energy....
            var targets:Structure[] = creep.room.find<Structure>(FIND_STRUCTURES,{
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structireType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            if(targets.length > 0)
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
}