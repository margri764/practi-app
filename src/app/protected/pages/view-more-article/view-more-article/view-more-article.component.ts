import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/article.reducer';
import { ArticlesService } from 'src/app/protected/services/articles/articles.service';

@Component({
  selector: 'app-view-more-article',
  templateUrl: './view-more-article.component.html',
  styleUrls: ['./view-more-article.component.scss']
})
export class ViewMoreArticleComponent implements OnInit {

  article : any  ;

  constructor(
              private activatedRoute : ActivatedRoute,
              private articleService : ArticlesService,
              private router : Router,
)
{

this.activatedRoute.params.subscribe(
( {id} ) =>{ 
  console.log(id);
  this.articleService.getArticleById(id).subscribe(
    ({articulos})=>{
        if(articulos){
          this.article = articulos;

        }
    }
  )
})
}
  ngOnInit(): void {

  }

}