function createListItem(name,artist,image,songId) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const btn = document.createElement("button");
    const btnimg = document.createElement("img");
    const song = ''.concat('playSong(', songId, ')');
    
    div.setAttribute("class","songItem");
    document.getElementById("list").appendChild(div);

    img.setAttribute("src",image);
    div.appendChild(img);

    p1.setAttribute("class","name");
    p1.innerHTML = name;
    div.appendChild(p1);

    p2.setAttribute("class","artist");
    p2.innerHTML = artist;
    div.appendChild(p2);

    btn.setAttribute("onclick",song);
    div.appendChild(btn);

    btnimg.setAttribute("src","https://cdn-icons-png.flaticon.com/512/483/483054.png");
    btn.appendChild(btnimg);
}

createListItem("Name","Artist","img/1.jpg","0");