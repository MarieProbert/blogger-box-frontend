import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Category } from "../data/category";

@Injectable()
export class CategoryService {
    private categoriesUrl = 'http://localhost:8080/categories';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl);
    }

    /*
    create(category : CategoryCreateInput): Observable<Category> {
        return this.http.post<Category>(this.categoriesUrl, category);
    }*/

    update(category : Category): Observable<Category> {
        return this.http.put<Category>(this.categoriesUrl, category)
        .pipe(
            catchError((this.handleError<Category>('update', category)))
        );
    }

    delete(category: Category): Observable<boolean> {
        return this.http.delete<boolean>(`${this.categoriesUrl}/${category.id}`);
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`, error); // log to console
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
}