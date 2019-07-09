import Target from './../models/Target.js';
import TargetList from './../models/TargetList.js';
import Data from './../Data.js';


class TargetListBuilder {

    static build() {
        let targetList = new TargetList();

        Data.forEach(target_ => {
            let target = new Target(target_.id, target_.name, target_.description, target_.priority);
            targetList.add(target);
        });

        return targetList;
    }

}

export default TargetListBuilder;