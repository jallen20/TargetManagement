import Target from './Target.js';

export default function TargetList(list) {

    this.targets = list || new Array();


    this.add = (target_) => {
        if (!target_) {
            throw Error(`Cannot add target : ${target_}`);
        }
        this.targets.push(target_);
    };

    this.delete = (target_) => {
        if (!target_) {
            throw Error(`Cannot delete target: ${target_}`);
        }
        this.targets.splice((() => {
                for (let i = 0; i < this.targets.length; i++) {
                    if (this.targets[i].id.id_ === target_.id.id_) {
                        return i;
                    }
                }
            }).call(),
            1);
    };

    this.sortByName = () => {
        this.targets.sort();
    };

    this.sortByPriority = () =>{
        this.targets.sort((target1, target2) => target1.priority - target2.priority);
    };

    this.search = (name_) => {
        return this.targets.filter(target_ => {
            return target_.name.indexOf(name_) !== -1;
        });
    };
}