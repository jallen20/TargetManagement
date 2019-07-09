import Target from './../models/Target.js';
import TargetList from './../models/TargetList.js';


export default class TargetListBuilder {

    static build(data) {
        let targetList = new TargetList();

        data.forEach(target_ => {
            let target = new Target(target_.id, target_.name, target_.description, target_.priority);
            targetList.add(target);
        });

        return targetList;
    }

}