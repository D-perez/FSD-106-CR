/*
let items=[
    {
        code:'123',
        title:'Samsung TV',
        price:'400',
        description:'4k tv 55inch',
        category:'electronics',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.hfzJlnI8w-Shj8xkVuBppQHaEK%26pid%3DApi&f=1'
    },
    {       
        code:'743',
        title:'bose',
        price:'300',
        description:'loud speakers',
        category:'audio',
        image:'http://i.ebayimg.com/images/i/390969456673-0-1/s-l1000.jpg'
    },
    {        
        code:'999',
        title:'phone',
        price:'1000',
        description:'samsung',
        category:'phone',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.p4DrMtp1WRtULaGVxEFcNQHaDt%26pid%3DApi&f=1'
    }
];*/
var items=[];
var serverURL='http://restclass.azurewebsites.net/API/'

function fetchCatalog(){
    $.ajax({
        url:serverURL+'points',
        type:'GET',
        success:function(res){
            console.log('it works', res)
            for(var i=0;i<res.length;i++){
                if(  res[i].user=='daniel' &&  res[i].title !='' &&  res[i].description !='' &&  res[i].code!=''){
                    
                    items.push(res[i])

                }
                
            }
            displayCatalog();

        },
        error:function(details){

            console.log('ooops',details)
        }
        
    })
    //get items from server
}
function displayCatalog(){
    //travel inside array for loop
    for (let i = 0; i < items.length; i++) {
        var item=items[i]
        drawItem(item)
    //create template string
    
}
}
function drawItem(product){
var layout = `
            <div class='item' id='${product.code}'>
            <h3>${product.title} $${product.price}</h3>
            <img class='item-img' src='${product.image}'>
            
            <p><b>${product.category}</b> ${product.description} </p>
            <br>
            <button class='btn btn-dark'>Add to Cart</button>
            </div>
`;
//display on layout on dom
$('#catalog').append(layout)
console.log('works')

}

function Search(){
    var searchText= $('#txt-search').val();

    // $('#catalog').html('');

    for(var i=0; i<items.length;i++ ){
        var item= items[i];
        if(item.title.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText) || item.code.toLowerCase().includes(searchText) || item.price.includes(searchText)){
            $('#'+item.code).show();
            console.log(item.code)
        }
        else{
            $('#'+item.code).hide()
        }
    }
}

function init(){
    // displayCatalog()
    fetchCatalog()
    $('#btn-search').click(Search)
    
    $('#txt-search').change(function(){
        var searchText= $('#txt-search').val();
        for(var i=0;i<items.length;i++){
        if(searchText===''){ 
            // $('#'+items[i].code).show()
            drawItem(items[i])
        }
        }
    })
    $('#txt-search').keypress(function(e){
        if(e.keyCode==13){
            Search();
        }
    })


}

window.onload=init;
