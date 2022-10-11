import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './model/Game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private urlGame='http://localhost:8080/game';

    constructor(
        private http: HttpClient
    ) { }

    getGames(title?: String, categoryId?: number): Observable<Game[]> {            
        return this.http.get<Game[]>(this.composeFindUrl(title, categoryId));
    }

    saveGame(game: Game): Observable<void> {
        let url = this.urlGame;

        if (game.id != null) {
            url += '/'+game.id;
        }

        return this.http.put<void>(url, game);
    }

    private composeFindUrl(title?: String, categoryId?: number) : string {
        let params = '';

        if (title != null) {
            params += 'title='+title;
        }

        if (categoryId != null) {
            if (params != '') params += "&";
            params += "idCategory="+categoryId;
        }

        let url = this.urlGame;

        if (params == '') return url;
        else return url + '?'+params;
    }
}
