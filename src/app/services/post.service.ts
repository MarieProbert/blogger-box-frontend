import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../data/post';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.apiUrl}v1/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  getPostsByCategoryId(categoryId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/category/${categoryId}`);
  }

  createPost(post: Post): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, post);
  }

  updatePost(id: string, post: Post): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}