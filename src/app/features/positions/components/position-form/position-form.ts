import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { PositionsService } from '../../../../core/services/positions';
import { Position } from '../../../../core/models/position.model';

@Component({
  selector: 'app-position-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './position-form.html',
})
export class PositionFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: PositionsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      parentId: [null as number | null],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // If adding child, get parentId from query param
    const parentId = Number(this.route.snapshot.queryParamMap.get('parentId'));
    if (parentId) this.form.patchValue({ parentId });

    if (this.id) {
      const data = this.service.getById(this.id);
      if (data) this.form.patchValue(data);
    }
  }

  get positions() {
    return this.service.positions();
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload: Position = { ...this.form.value, id: this.id ?? 0, children: [] };

    if (this.id) {
      this.service.update(this.id, payload);
    } else {
      this.service.create(payload);
    }

    this.router.navigate(['/positions']);
  }


  onCancel() {
    this.router.navigate(['/positions']);
  }
}
