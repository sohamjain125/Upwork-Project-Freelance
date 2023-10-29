
const GetFormValuesForSqlInsert = () => {
    let finalResult = [];
    let form = document.getElementsByTagName('form')[0];
    if(!form) return;
    let inputs = form.getElementsByTagName('input');
    for(let i=0; i<inputs.length; i++)  {
            // finalResult.push("`"+labels[i].innerText+"` = '" + inputs[i].value + "'") ;
            finalResult.push(inputs[i].value) ;
    };
    // finalResult = finalResult.join();
    // finalResult = encodeURI(finalResult);
    return finalResult;
}

const GetFormValuesForSqlUpdate = () => {
    let finalResult = [];
    let ref = 0;
    let form = document.getElementsByTagName('form')[0];
    if(!form) return;
    let inputs = form.getElementsByTagName('input');
    let labels = form.getElementsByTagName('label');
    // `FirstName` = 'tenflewe', 
    for(let i=0; i<inputs.length; i++)  {
            // finalResult.push("`"+labels[i].innerText+"` = '" + inputs[i].value + "'") ;
            finalResult.push(inputs[i].value) ;
    };
    ref = finalResult[0];
    // finalResult = finalResult.join();
    // finalResult = encodeURI(finalResult);
    return {finalResult, ref};
}
const GetFormRef = () => {
    let ref = 0;
    let form = document.getElementsByTagName('form')[0];
    if(!form) return;
    let inputs = form.getElementsByTagName('input');
    ref = inputs[0].value;
    return ref;
}

export {
    GetFormValuesForSqlInsert,
    GetFormValuesForSqlUpdate,
    GetFormRef
    
}