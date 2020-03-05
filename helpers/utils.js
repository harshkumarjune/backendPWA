export default a => {
    for(var i = 0; i <= a.length; i++) {
        for(var j = i; j <= a.length; j++) {
            if(i != j && a[i] == a[j]) {
                return true;
            }
        }
    }
    return false;
}