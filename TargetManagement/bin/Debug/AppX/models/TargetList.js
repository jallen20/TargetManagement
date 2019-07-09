import Target from './Target.js';

const TargetList = {};

Object.defineProperty(TargetList,
    'targets',
    {
        value: new Array(),
        writable: false
    });

Object.defineProperty(TargetList, 'add',
    {
        value: (target_) => {
            if (!target_) {
                throw Error(`Cannot add target : ${target_}`);
            }
            this.targets.push.call(TargetList, target_);
        },
        writable: false
    }
);

TargetList.prototype.delete = (target_) => {
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

TargetList.prototype.sortByName = () => {
    this.targets.sort();
};

TargetList.prototype.sortByPriority = () => {
    this.targets.sort((target1, target2) => target1.priority - target2.priority);
};

TargetList.prototype.search = (name_) => {
    return this.targets.filter(target_ => {
        return target_.name.indexOf(name_) !== -1;
    });
};

export default TargetList;
