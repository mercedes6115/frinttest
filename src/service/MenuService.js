// let 재할당 가능 중복선언 불가능
// const 재할당 불가능 중복선언 불가능

class MenuService{
    
    MenuIntoTree = (tree_menu_list) =>{           
        var map = {}, node, roots = [], i;
        //console.log(tree_menu_list);
        for (i = 0; i < tree_menu_list.length; i++) {
            map[tree_menu_list[i].id] = i; // initialize the map
            tree_menu_list[i].children = []; // initialize the children adding a new property by using dot notation
        }
        //console.log("MAP:"+JSON.stringify(map)); how to print jsObject elements by using JSON.stringfy
        
        for (i = 0; i < tree_menu_list.length; i ++) {
            node = tree_menu_list[i];
            //console.log(JSON.stringify(node));
            //console.log(node.parent);
            if (node.parent !== "ROOT") {   
            // if you have dangling branches check that map[node.parentId] exists
            tree_menu_list[map[node.parent]].children.push(node);     
            } else {
            roots.push(node);
            }
        }
        //console.log(roots);
        return roots;
        }
}
export default new MenuService();