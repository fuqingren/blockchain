/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fordham.education.PublishTranscript} publish - the trade to be processed
 * @transaction
 */
async function publishTr(publish){
    const registry=await getAssetRegistry('org.fordham.education.TranscriptViewBy');
    const factory=getFactory();
    //create the asset TranscriptViewBy

    const newasset=factory.newResource('org.fordham.education','TranscriptViewBy',publish.tVid);
    newasset.status=publish.status;
    newasset.ReviewedCompany=publish.ReviewedCompany
  	newasset.company=publish.company

    //add TranscriptViewBy to the registry
    await registry.add(newasset);
}
