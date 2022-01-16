export default function sortList(list, type) {

    console.log('type: ' + type);

    if (Array.isArray(list)) {
        let titleArray = [];
        let importanceArray = [];
        let sortedArray = [];
        //make new arrays of titles, and title importance pairs

        for (let i=0; i<list.length; i++) {
            titleArray[i] = list[i].text;
            importanceArray[i] = list[i].importance + ' ' + list[i].text;
        }

        console.log('titleArray: ' + titleArray);
        console.log('importanceArray: ' + importanceArray);

        switch (type) {
            case '0':
                //newest first
                sortedArray = [...list].reverse();
                break;
            case '1':
                //alphabetical a-z
                titleArray.sort();
                for (let i=0; i<list.length; i++) {
                    let titleIndex = titleArray.indexOf(list[i].text);
                    sortedArray[titleIndex] = list[i];
                }
                console.log(' alphabetically sorted sortedArray: ' + sortedArray);
                break;
            case '2':
                //importance high to low
                importanceArray.sort();
                for (let i=0; i<list.length; i++) {
                    let importanceIndex = importanceArray.indexOf((list[i].importance + ' ' + list[i].text));
                    sortedArray[importanceIndex] = list[i];
                    
                }
                sortedArray = sortedArray.reverse();
                console.log('importance-sorted sortedArray: ' + sortedArray);
                break;
            case '3':
                //oldest first
                let listArray = [...list];
                sortedArray = listArray;
                break;
            case '4':
                //alphabetical z-a
                titleArray.sort();
                for (let i=0; i<list.length; i++) {
                    let titleIndex = titleArray.indexOf(list[i].text);
                    sortedArray[titleIndex] = list[i];
                }
                console.log('reverse-alphabetically sorted sortedArray: ' + sortedArray);
                sortedArray = sortedArray.reverse();
                break;
            case '5':
                //importance low to high
                importanceArray.sort();
                for (let i=0; i<list.length; i++) {
                    let importanceIndex = importanceArray.indexOf((list[i].importance + ' ' + list[i].text));
                    sortedArray[importanceIndex] = list[i];
                    
                }
                console.log('reverse-importance-sorted sortedArray: ' + sortedArray);
                break;
            default:
                console.log('tf');
                sortedArray = list;
                break;
        }
        console.log('sortedArray: ' + sortedArray);
        return sortedArray;

    } else {
        console.log('list is not an array. list: ' + list)
        return [0];
    }

}