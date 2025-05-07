import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import du service Router
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Category } from '../../data/category';
import { Post, PostCreateInput } from '../../data/post';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  standalone: false
})
export class AddPostComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router // Injection du service Router
  ) {
    this.form = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(150)],
      ],
      category: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
      createdDate: [null], // Ajout de createdDate
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Failed to load categories:', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Please review your post',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    this.isSubmitting = true;

    const postData: PostCreateInput = {
      title: this.form.value.title,
      content: this.form.value.content,
      categoryId: this.form.value.category, // Map categoryId to a category object
    };

    console.log('Data sent to backend:', postData); // Debug

    this.postService.createPost(postData).subscribe({
      next: () => {
        console.log('Post created successfully!');
        this.form.reset();
        this.isSubmitting = false;

        Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Post Submitted Successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });    

        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        this.isSubmitting = false;

        Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Failed to submit post',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
      },
    });
  }
}


