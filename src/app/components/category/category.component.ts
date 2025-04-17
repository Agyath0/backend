import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  editingCategoryId: number | null = null;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit() {
    const category: Category = this.categoryForm.value;

    if (this.editingCategoryId) {
      this.categoryService.updateCategory(this.editingCategoryId, category).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    } else {
      this.categoryService.createCategory(category).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    }
  }

  editCategory(category: Category) {
    this.categoryForm.setValue({
      categoryId: category.categoryId,
      description: category.description
    });
    this.editingCategoryId = category.categoryId ?? null;
  }

  deleteCategory(categoryId: number | undefined) {
    if (!categoryId) return;
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.loadCategories();
    });
  }

  resetForm() {
    this.categoryForm.reset();
    this.editingCategoryId = null;
  }
}
