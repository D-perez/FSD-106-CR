var serverURL='http://restclass.azurewebsites.net/API/';
let items=[];


class Item{
    constructor(code,title,price,description,category,image){
        this.code=code;
        this.title=title;
        this.price=price;
        this.description=description;
        this.category=category;
        this.image=image;
        this.user='daniel'
    }
}

function clearForm(){
    $('#code').val('');
    $('#title').val('');
    $('#price').val('');
    $('#description').val('');
    $('#category').val('');
    $('#image').val('');
}
function register(){
    //save input value in variables
    var code = $('#code').val();
    var title = $('#title').val();
    var price = $('#price').val();
    var description = $('#description').val();
    var category = $('#category').val();
    var image = $('#image').val();
    //create obj using constructorf


    if(code!='' && title!='' && price!=''){
        var newItem = new Item(code,title,price,description,category,image);
        //push to array
        items.push(newItem);

        var jsonString= JSON.stringify(newItem);
        console.log(newItem);
        console.log(jsonString);
        
    }else{alert('missing fields')}


    //display in array
    console.log(Item);
    
    $.ajax({
        url:serverURL+"points",
        type:"POST",
        contentType:"application/json",
        data:jsonString,
        success:function(response){
            console.log('it worked',response)
            //show notification
            $('#alert-box').removeClass('hidden')
            //hide notification
            setTimeout(function(){$('#alert-box').addClass('hidden')},2000)
        },
        error:function(errorDetails){
            console.log('something is wrong', errorDetails)
        }
    });

    clearForm()
}




function init(){
    console.log('good');
    $('#btn-register').on('click',function(){
        register();
    });

}



window.onload=init;