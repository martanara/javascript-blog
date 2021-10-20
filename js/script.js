{

  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
  };

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

    const activeArticles = document.querySelectorAll(select.all.articles, '.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const clickedArticle = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(clickedArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      titles: '.post-title',
      linksTo: {
        titles: '.titles a',
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  const generateTitleLinks = function(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(select.listOf.titles);

    const clearList = function(list) {
      list.innerHTML = '';
    };

    clearList(titleList);

    const articles = document.querySelectorAll(select.all.articles + customSelector);

    /* for each article */

    let html = '';

    for(let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */

      const articleTitle = article.querySelector(select.all.titles).innerHTML;

      /* create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};

      const linkHTML = templates.articleLink(linkHTMLData);

      html = html + linkHTML;
    }

    /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', html);

    const links = document.querySelectorAll(select.all.linksTo.titles);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function (tags){
    const params = {
      min: 999999,
      max: 0,
    };

    for(let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }

    return params;
  };

  const calculateTagClass = function (count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );
    return opts.tagSizes.classPrefix + classNumber;
  };

  const generateTags = function (){
    /* Create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(select.article.tags);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */

        // const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

        const linkHtmlData = {tag: tag};

        const linkHtml = templates.tagLink(linkHtmlData);

        /* add generated code to html variable */

        html = html + linkHtml;

        /* Check if this tag is NOT already in allTags */

        if(!allTags[tag]) {
          /* Add tag to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */
    }

    /* Find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);

    /* Create variable for all links HTML code */
    const allTagsData = {tags: []};

    /* START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* Generate code of a link and add it to allTagsHTML */

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });

      /* END LOOP: for each tag in allTags: */
    }

    /* Add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
    const tagLinks = document.querySelectorAll(select.all.linksTo.tags);

    /* START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    /* Create a new variable allTags with an empty object */
    let allAuthors = {};

    /* find all articles */

    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */

    for(let article of articles){

      /* find author wrapper */

      const authorWrapper = article.querySelector(select.article.author);

      /* get author from data-author attribute */

      const authorName = article.getAttribute('data-author');

      /* generate author name html link */

      const linkHtmlData = {author: authorName};

      const linkAuthor = templates.authorLink(linkHtmlData);

      /* insert the link into the author wrapper */

      authorWrapper.insertAdjacentHTML('afterbegin', linkAuthor);

      /* Check if this author is NOT already in allAuthors */

      if(!allAuthors[authorName]) {
        allAuthors[authorName] = 1;
      } else {
        allAuthors[authorName]++;
      }
      /* END LOOP: for every article: */
    }

    /* Find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);

    const allAuthorsData = {authors: []};

    /* Create variable for all links HTML code */
    // let allAuthorsHTML = '';

    /* START LOOP: for each tag in allTags: */
    for(let author in allAuthors){
      /* Generate code of a link and add it to allTagsHTML */

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
      /* END LOOP: for each author in allAuthors: */
    }

    // console.log(allAuthorsData);

    /* Add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = templates.authorListLink(allAuthorsData);
  };

  generateAuthors();

  const authorClickHandler = function(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */

    const author = href.replace('#author-', '');

    /* find all author links with class active */

    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for(let activeLink of activeLinks){

      /* remove class active */

      activeLink.classList.remove('active');

    /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let authorLink of authorLinks){

      /* add class active */

      authorLink.classList.add('active');

      /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function(){

    /* find all links to authors */
    const authorLinks = document.querySelectorAll(select.all.linksTo.authors);

    /* START LOOP: for each link */
    for(let authorLink of authorLinks){

      /* add tagClickHandler as event listener for that link */

      authorLink.addEventListener('click', authorClickHandler);
    }

    /* END LOOP: for each link */
  };

  addClickListenersToAuthors();

}

