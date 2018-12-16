import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { LogService } from '../../../services/logService';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss']
})
export class TagFilterComponent implements OnInit {
  @Output() change = new EventEmitter();
  tags = ['sql', 'stuff', 'sick', 'bears', 'coffee', 'sunshine'];
  selectedTags = [];
  value = '';

  constructor(private log: LogService) { 
    //Add new tags when they come.
    this.log.tagsAdded.subscribe(tags => {
      this.tags.push.apply(this.tags, tags);
    });

    //Load initial tags
    this.log.getTags()
    .then(r => this.tags = r);
  }

  public ngOnInit() {
  }

  public select(match: TypeaheadMatch) {
    //move item from tags to selectedTags
    const index = this.tags.indexOf(match.item);
    if (index === -1) throw new Error("Match doesn't exist");

    this.selectedTags.push(match.item);
    this.tags.splice(index, 1);

    this.value = '';
    this.change.emit(this.selectedTags);
  }

  public remove(tag: string) {
    //move item from selectedTags back to tags
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) throw new Error("Tag doesn't exist");

    this.tags.push(tag);
    this.selectedTags.splice(index, 1);
    this.change.emit(this.selectedTags);
  }

}
