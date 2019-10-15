'use strict';

$('body').ready(function() {
    initPage()

    $('form').submit(function(){
        
        var email = $('#input-contact-email').val();
        var msg = $('#input-contact-msg').val();
        var subject = `New message from ${email} (Meital's Gallery)`;
        var myEmail = 'lazarovich.meital@gmail.com';
        
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${msg}`, '_blank');
        $('.offcanvas-btn').click();
        return false;
    })

    $('.portfolio-link').click(function(){
        renderProjModal(this.dataset.id)
    })
});

function initPage() {
    var projs = getProjs();
    var strHTMLs = projs.map(function(proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
                    <a class="portfolio-link" data-id="${proj.id}" data-toggle="modal" href="#portfolio-modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img class="proj-item-img img-fluid" src=${proj.projItemImgUrl} alt=""/>
                    </a>
                    <div class="portfolio-caption">
                        <h4>${proj.name}</h4>
                        <p class="text-muted">${proj.title}</p>
                    </div>
                </div>`
    })
    $('.proj-items-container').html(strHTMLs.join(''));
}


function renderProjModal(projId) {
    var proj = getProjById(projId);
    $('.proj-name').text(proj.name);
    $('.proj-title').text(proj.title);
    $('.proj-img').attr('src', proj.imgUrl);
    $('.proj-desc').text(proj.desc);
    $('.proj-date').text(proj.date);
    $('.proj-url').attr('href', proj.projUrl);
    
    var labels = proj.labels;
    var strHTMLs = labels.map(function(label) {
        return `<a href="#" class="badge badge-secondary">${label}</a>`;
    })
    $('.proj-labels').html(strHTMLs.join(''));
}
