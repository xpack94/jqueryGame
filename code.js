$(function(){
    
    var game={
        
        lignes:4,
        colonnes:4,
        url:'img.png',
        tdWidth:125,
        tdHeight:125,
        couleurImageVide:"grey",
        taille:0,
        nbrTour:300,
        init:function(){
            this.cachDom();
            this.addEvents();
            this.createGrid();
        },
        
        cachDom:function(){
            this.$grid=$(".grid");
            this.$imageChnager=$(".imageChnager");
            this.$imageUrl=$("#imageUrl");
            this.$nbrLignes=$("#nbrLignes");
            this.$nbrColonnes=$("#nbrColonnes");
            this.$afficher=$(".afficher");
            this.$affichageOrdre=$("#affichageOrdre");
            this.$brasser=$(".brasser");
            this.$deplacements=$(".deplacement span");
        
        
        },
        
        addEvents:function(){
            this.$imageChnager.click(this.changeImage.bind(this));
            this.$afficher.click(this.afficher.bind(this));
            this.$brasser.click(this.shuffle.bind(this));
            this.$nbrLignes.change(this.updateLignes.bind(this));
            this.$nbrColonnes.change(this.updateColonnes.bind(this));
            this.$affichageOrdre.click(this.showOrder.bind(this));
        },
        
        createGrid:function(){
          ordreDesCase=0;
          let table=$("<table></table>");
          for(let i=0;i<this.lignes;i++){
              let tr=$("<tr></tr>");
              for(let j=0;j<this.colonnes;j++){
                let td=$("<td></td>");
                let span=$("<span></span>");
                //verifier que ce n'est pas la derniere case ou se trouve l'image vide
                if(i*j!=(this.lignes-1)*(this.colonnes-1)){
                    td.attr("draggable",'true');
                    td.attr("ondragstart",'drag(event)');
                    td.attr("data-order",++ordreDesCase);
                    td.addClass(`td${i}${j}`);
                     td.css({
                    "width":this.tdWidth,
                    "height":this.tdHeight,
                    "background-image":`url(${this.url})`,
                    "background-position": `${-j*this.tdWidth}px ${-i*this.tdHeight}px`,
                    "background-repeat":"no-repeat"
                    
                });
                
                }else{
                    //mettre la derniere case comme case vide
                    td.addClass("vide");
                    td.css({
                    "width":this.tdWidth,
                    "height":this.tdHeight,
                    "background-color":this.couleurImageVide
                    
                });  
                }
                span.html(ordreDesCase);
                td.append(span);   
                tr.append(td);
              }
                table.append(tr);
                
          }
            
            this.$grid.html(table);
            this.taille=ordreDesCase;
           
        },
        
        changeImage:function(){
            if(this.$imageUrl.val()!=""){
               this.url=this.$imageUrl.val();
               this.createGrid();
            }else{
                alert("taper un url");
            }
        },
        
        afficher:function(){
           
        },
            
        showOrder:function(){
           if(this.$affichageOrdre.is(":checked")){
               $("td span").css("opacity",1);
           }else{
               $("td span").css("opacity",0);
           }
        },
        
        updateLignes:function(){
          
              let nbLignes=parseInt(this.$nbrLignes.val());
              this.lignes=nbLignes;
              this.createGrid();
        },
        updateColonnes:function(){
              let nbLignes=parseInt(this.$nbrColonnes.val());
              this.colonnes=nbLignes;
              this.createGrid();
        },
        
        shuffle:function(){
            for(let i=0;i<this.nbrTour;i++){
                let caseVide=$(".vide");
                let rand=Math.floor(Math.random()*this.taille +1);
                let caseDuTableau=$(`[data-order="${rand}"] `) ;
                //faire le switch de la case generer en random avec la case vide
                this.swap(caseDuTableau,caseVide);
               
               
            }
            
        },
       //fonction qui swap deux elements 
       swap:function(to,from) {
         
            var copy_to = $(to).clone(true);
            $(from).replaceWith(copy_to);
            $(to).replaceWith(from);
           
        }

        
        
    }//fin de l'obejet game
    
    
    
    
    
   
game.init();    
});
