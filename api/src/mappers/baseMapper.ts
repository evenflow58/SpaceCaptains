export class BaseMapper {
    static mapArray(array: Array<any>, singleMapCallback: Function): Array<any> {
        let result: Array<any> = new Array<any>();

        array.forEach(element => {
            result.push(singleMapCallback(element));
        });

        return result;
    }
}