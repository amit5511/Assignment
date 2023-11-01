    const socket = io();
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    function createElement(data,className){
        if(!data){
            data = "Something went wrong"
        }
        let ele = document.getElementById("result");
        let newelement = document.createElement("p");
        newelement.innerHTML=data;
        ele.appendChild(newelement)
        newelement.classList.add(className)
        let objDiv= document.getElementById("chatbot");
        objDiv.scrollTop = objDiv.scrollHeight
    }

    function searchQuery(){
        let data = document.getElementById("query").value
        if(data.trim().length==0){
            alert("Search query can't be empty")
            return;
        }
        createElement(data,"sent")
        document.getElementById("query").value=''
        socket.emit("search",JSON.stringify(data));
    }

    socket.on("search_result",(data)=>{
        console.log(data)
        data=JSON.parse(data);
        createElement(data,"received")
    })

    

   