{

  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorsSelector = '.post-author';

  const generateTitleLinks = function(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    const clearList = function(list) {
      list.innerHTML = '';
    };

    clearList(titleList);

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    /* for each article */

    let html = '';

    for(let article of articles){

      /* get the article id */

      const articleID = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';

      html = html + linkHTML;
    }

    /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', html);

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags = function (){
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */

        const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

        /* add generated code to html variable */

        html = html + linkHtml;

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */
    }
  };

  generateTags();

  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for(let activeLink of activeLinks){

      /* remove class active */

      activeLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');


    /* START LOOP: for each found tag link */

    for(let tagLink of tagLinks){

      /* add class active */

      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags .list a');

    /* START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for(let article of articles){

      /* find author wrapper */

      const authorWrapper = article.querySelector(optArticleAuthorsSelector);

      /* make html variable with empty string */

      let linkHtml = '';

      /* get author from data-author attribute */

      const authorName = article.getAttribute('data-author');

      /* generate author name html link */

      linkHtml = 'by <a href="#' + authorName + '"><span>' + authorName + '</span></a>';

      /* insert the link into the author wrapper */

      authorWrapper.insertAdjacentHTML('afterbegin', linkHtml);

      /* END LOOP: for every article: */
    }
  };

  generateAuthors();



}


/*

<li><a href="#"><span class="author-name">Kitty Toebean</span></a></li>

*/
