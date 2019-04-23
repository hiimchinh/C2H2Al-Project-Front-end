import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogInterface} from '../../blog-interface';
import {BlogService} from '../../services/blog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-blog-update',
    templateUrl: './blog-update.component.html',
    styleUrls: ['./blog-update.component.sass']
})
export class BlogUpdateComponent implements OnInit {
    options: FormGroup;
    blog: BlogInterface;
    blogUpdateForm: FormGroup;
    selectedFile: File = null;

    constructor(private fb: FormBuilder,
                private blogService: BlogService,
                private route: ActivatedRoute) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
        this.blog = {
            title: null,
            content: null,
            description: null,
            id: null,
            image: null
        };
    }

    ngOnInit() {
        this.blogUpdateForm = this.fb.group({
            title: [''],
            content: [''],
            description: [''],

        });
        const id = +this.route.snapshot.paramMap.get('id');
        this.blogService.showBlogDetail(id).subscribe(
            (data) => {
                this.blog = data;
                this.blogUpdateForm.patchValue(data);
            }
        );
    }

    updateBlog() {
        const {value} = this.blogUpdateForm;
        if (this.selectedFile === null) {
            const blogUpdate = new FormData();
            blogUpdate.append('title', value.title);
            blogUpdate.append('content', value.content);
            blogUpdate.append('description', value.description);
            return this.blogService.updateBlog(this.blog.id, blogUpdate).subscribe(
                data => console.log(data),
                error1 => console.log(error1)
            );
        } else {
            const blogUpdate = new FormData();
            blogUpdate.append('title', value.title);
            blogUpdate.append('content', value.content);
            blogUpdate.append('description', value.description);
            blogUpdate.append('image', this.selectedFile);
            return this.blogService.updateBlog(this.blog.id, blogUpdate).subscribe(
                data => console.log(data),
                error1 => console.log(error1)
            );
        }

    }

    selectFile(event) {
        this.selectedFile = event.target.files[0];
        return this.selectedFile;
    }
}